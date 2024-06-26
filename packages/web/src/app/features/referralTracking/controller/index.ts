import { getGoalByFilter } from '@features/referralTracking/services'
import { useQueryData } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import {
  TGetGoalRequest,
  TGoalFiltersOptions,
  TGoalResponse,
  TReferralTrackingHeaderOptions,
} from '@shared/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { MdCalendarMonth } from 'react-icons/md'
import { IoTodayOutline } from 'react-icons/io5'
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthDayRange,
  getSaturdayDate,
  getSundayDate,
  getWeekNumber,
} from '@shared/utils/dates'
import { progressGoal } from '@shared/utils/validation'
import { months } from '@shared/utils/constants/months'
import { useQuery } from 'react-query'
import { cacheName } from '@shared/utils/constants/cacheName'

let id = 0

const DAY_IN_MILLIS = 24 * 60 * 60 * 1000
const INVALID_GOAL = 0
const date = new Date()
const year = date.getFullYear()
const monthIndex = date.getMonth() + 1
const month = months[monthIndex]

export const useReferralTrackingController = () => {
  const { sessionCustomer } = useUser()

  const [filterOption, setFilterOption] = useState<TGoalFiltersOptions>({
    filterMethod: 'semana',
    startGoalFilter: getSundayDate(),
    endGoalFilter: getSaturdayDate(),
  })

  const weekSlug = () => {
    const lastDateOfMonth = getLastDayOfMonth(date)
    const differenceInDays = Math.floor(
      (lastDateOfMonth.getTime() - date.getTime()) / DAY_IN_MILLIS,
    )

    if (differenceInDays < 7) {
      return `Última semana de ${month}`
    }

    const numberOfWeek = getWeekNumber()
    return `${numberOfWeek}ª semana de ${month}`
  }

  const monthSlug = () => {
    const { firstDay, lastDay } = getMonthDayRange(monthIndex, year)

    return `de ${firstDay} à ${lastDay} de ${month}`
  }

  const options: TReferralTrackingHeaderOptions[] = useMemo(
    () => [
      {
        id: id++,
        label: 'semana',
        slug: weekSlug(),
        icon: IoTodayOutline,
        options: {
          filterMethod: 'semana',
          startGoalFilter: getSundayDate(),
          endGoalFilter: getSaturdayDate(),
        },
      },
      {
        id: id++,
        label: 'mês',
        slug: monthSlug(),
        icon: MdCalendarMonth,
        options: {
          filterMethod: 'mês',
          startGoalFilter: getFirstDayOfMonth(new Date()).toISOString(),
          endGoalFilter: getLastDayOfMonth(new Date()).toISOString(),
        },
      },
    ],
    [],
  )

  const getGoals = useCallback(
    async (
      options: TGoalFiltersOptions,
    ): Promise<TGoalResponse[] | undefined> => {
      if (sessionCustomer) {
        const param = options.startGoalFilter ? options : filterOption
        const { endGoalFilter, startGoalFilter } = param

        const body: TGetGoalRequest = {
          email: sessionCustomer?.email,
          endGoalFilter,
          startGoalFilter,
        }

        const goals = await getGoalByFilter(body)

        return goals
      }
    },
    [sessionCustomer, filterOption],
  )

  const { data: goals } = useQueryData(
    getGoals,
    'goalsByFilter',
    '12-hours',
    !!sessionCustomer && !!filterOption.startGoalFilter,
  )

  const handleChangeGoalFilter = async (options: TGoalFiltersOptions) => {
    setFilterOption(options)
    await getGoals(options)
  }

  const { data: currentGoal } = useQuery<TGoalResponse>(cacheName.currentGoal)

  const [formattedGoals, setFormattedGoals] = useState<TGoalResponse[]>(
    goals || [],
  )

  useEffect(() => {
    if (currentGoal && goals?.[0]) {
      const goalCompletePercent = progressGoal(
        currentGoal?.words,
        currentGoal?.goal,
      )

      const updatedCurrentGoal: TGoalResponse = {
        ...goals[0],
        words: currentGoal.words,
        goal: currentGoal.goal,
        goalComplete: goalCompletePercent >= 100,
        goalCompletePercent,
      }

      const newGoalsArray = goals.map((goal, i) =>
        i === 0 ? updatedCurrentGoal : goal,
      )

      setFormattedGoals(newGoalsArray)
    }
  }, [goals, currentGoal])

  const reducedGoalsComplete =
    (formattedGoals &&
      formattedGoals?.filter(
        (goal) => goal.goal !== INVALID_GOAL && goal.goalComplete === true,
      )) ??
    []

  const goalsComplete = reducedGoalsComplete.length

  const reducedWordsWritten =
    formattedGoals?.reduce((acc, goal) => acc + goal.words, 0) ?? 0

  const wordsWritten = reducedWordsWritten

  const goalsDeclared =
    formattedGoals?.reduce((acc, goal) => acc + goal.goal, 0) ?? 0

  const formattedWords =
    progressGoal(wordsWritten, goalsDeclared).toFixed(1) || 0
  const formattedGoalsComplete =
    (formattedGoals &&
      progressGoal(goalsComplete, formattedGoals?.length).toFixed(1)) ||
    0

  const series = [+formattedGoalsComplete, +formattedWords]

  const currentFilterMethod = filterOption.filterMethod

  return {
    handleChangeGoalFilter,
    options,
    wordsWritten,
    goalsComplete,
    series,
    currentFilterMethod,
    filterOption,
  }
}
