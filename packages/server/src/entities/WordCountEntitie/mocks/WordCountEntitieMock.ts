import { WordCount } from '@prisma/client'
import { randomUUID } from 'crypto'
import { userEntitieMock } from 'src/entities/User/mocks/userEntitieMock'

export const WordCountEntitieMock: WordCount = {
  id: randomUUID(),
  email: userEntitieMock.email,
  words: 350,
  updatedAt: new Date(),
  createdAt: new Date(),
}
