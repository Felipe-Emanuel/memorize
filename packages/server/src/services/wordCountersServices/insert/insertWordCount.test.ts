import { wordsCounterEntitieMock } from 'src/entities/WordsCounter/mocks/wordsCounterEntitieMock'
import { throwWordsCounterMessages } from 'src/entities/WordsCounter/utils'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { inMemoryWordCounterRepository } from 'src/repositories/inMemory/inMemoryWordCounterRepository'
import { InsertWordCountService } from 'src/services/wordCountersServices/insert/insertWordCount'

describe('InsertWordCountService', () => {
  const { createWordCounter, getCounterByEmail, insertWordCount } =
    inMemoryWordCounterRepository()

  const action: Pick<
    IWordCounterRepository,
    'insertWordCount' | 'getCounterByEmail'
  > = {
    getCounterByEmail,
    insertWordCount,
  }

  const wordCount = wordsCounterEntitieMock.wordCount[0]

  const { words, email } = wordCount

  it('should throw about word counter not found', () => {
    const sut = InsertWordCountService({
      action,
      words,
      email,
    })

    expect(sut).rejects.toThrow(throwWordsCounterMessages.wordCounterNotFount)
  })

  it('should be able to insert into a existent wordCount', async () => {
    const wordCounter = await createWordCounter(wordCount)

    const sut = await InsertWordCountService({
      action,
      words: wordCounter.wordCount[0].words,
      email,
    })

    expect(sut.wordCount[1].words).toEqual(words)
  })
})
