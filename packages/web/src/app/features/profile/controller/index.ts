import {
  TUpdateWordCountSchema,
  updateWordCountSchema,
} from '@features/profile/ProfileUtils'
import { updateCurrentGoal, getCurrentGoal } from '@features/profile/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryData, useQueryMutation } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'
import { capitalizeName } from '@shared/utils/transformers'
import { progressGoal } from '@shared/utils/validation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useProfileController = () => {
  const { sessionCustomer } = useUser()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getGoal = useCallback(
    async () => await getCurrentGoal(sessionCustomer?.email),
    [sessionCustomer],
  )

  const {
    data: currentGoal,
    isLoading: currentGoalLoading,
    refetch,
  } = useQueryData(getGoal, 'currentGoal', '12-hours')

  useEffect(() => {
    if (sessionCustomer?.email && !currentGoal?.words) refetch()
  }, [refetch, sessionCustomer?.email, currentGoal?.words])

  const wordsCount = currentGoal?.words || 0

  const wordsCountText =
    wordsCount > 0
      ? `Hoje você escreveu ${wordsCount} palavras.`
      : 'Você ainda não escreveu nenhuma palavra hoje!'

  const userName = capitalizeName(sessionCustomer?.name?.split(' ')[0] ?? '')

  const wordCountSchema = useForm<TUpdateWordCountSchema>({
    resolver: zodResolver(updateWordCountSchema),
    defaultValues: {
      wordCount: currentGoal?.words || 100,
    },
  })

  const { handleSubmit, reset } = wordCountSchema

  const { mutateAsync } = useQueryMutation<
    TGoalResponse,
    TUpdateCurrentGoalRequest
  >(updateCurrentGoal, 'currentGoal', 'updatedGoal')

  const onSubmit = async (data: TUpdateWordCountSchema) => {
    if (currentGoal) {
      const goalComplete = progressGoal(data.wordCount, currentGoal?.goal)

      const createWordCountRequest: TUpdateCurrentGoalRequest = {
        goalId: currentGoal?.id,
        updatedGoal: {
          ...currentGoal,
          words: data.wordCount,
          goalComplete: goalComplete >= 100,
        },
      }

      await mutateAsync(createWordCountRequest)
    }

    reset()
    toggleFormVisible()
  }

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible
    ? 'visible'
    : 'hidden'

  return {
    userName,
    wordsCountText,
    currentGoalLoading,
    sessionCustomer,
    currentGoal,
    wordCountSchema,
    visibleState,
    toggleFormVisible,
    handleSubmit,
    onSubmit,
  }
}
