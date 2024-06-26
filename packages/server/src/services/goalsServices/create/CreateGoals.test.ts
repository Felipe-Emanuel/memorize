import { mockGoal } from '@entities/Goals/mocks'
import { throwGoalsMessages } from 'src/entities/Goals/utils'
import { inMemoryGoalsRepository } from 'src/repositories/inMemory/inMemoryGoalsRepository'
import {
  CreateGoalsService,
  TCreateGoalsRequest,
} from 'src/services/goalsServices/create'

describe('CreateGoalsService', () => {
  const { createGoals } = inMemoryGoalsRepository()

  const action: TCreateGoalsRequest['action'] = { createGoals }

  it('should throw exception about goals not found', () => {
    const sut = CreateGoalsService({
      action,
      email: 'unexistent user email',
      goals: mockGoal,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should be able to create a goals', async () => {
    const sut = await CreateGoalsService({
      action,
      email: mockGoal.email,
      goals: mockGoal,
    })

    expect(sut[0].words).toEqual(mockGoal.words)
  })
})
