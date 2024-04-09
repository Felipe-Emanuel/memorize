import { globalErrorMessage } from '@utils'
import { FastifyInstance } from 'fastify'
import { authorization } from 'src/controllers/utils'
import { databaseBookRepository } from '@repositories'
import {
  CreateBookService,
  TCreateBookServiceRequest,
  GetAllBooksService,
  TGetAllBooksServiceRequest,
  DeleteBookService,
  TDeleteBookServiceRequest,
} from '@services'

export async function bookController(app: FastifyInstance): Promise<void> {
  const { getAllBooks, createBook, deleteBook } = databaseBookRepository()

  const actionGetAllBooks: TGetAllBooksServiceRequest['action'] = {
    getAllBooks,
  }
  const actionCreateBook: TCreateBookServiceRequest['actions'] = {
    createBook,
    getAllBooks,
  }
  const deleteBookAction: TDeleteBookServiceRequest['action'] = {
    deleteBook,
  }

  app.get('/books/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TGetAllBooksServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const books = await GetAllBooksService({
      action: actionGetAllBooks,
      userEmail,
    })

    try {
      apply.send(books)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.post('/books/:userEmail', async (req, apply) => {
    const { userEmail } = req.params as Partial<TCreateBookServiceRequest>
    const { book } = req.body as Partial<TCreateBookServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const newBook = await CreateBookService({
      actions: actionCreateBook,
      book,
      userEmail,
    })

    try {
      apply.send(newBook)
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })

  app.delete('/books/:bookId', async (req, apply) => {
    const { bookId } = req.params as Partial<TDeleteBookServiceRequest>
    const provider = req.headers.provider
    const accessToken = req.headers.authorization

    await authorization(provider, accessToken, apply)

    const deletedBook = await DeleteBookService({
      action: deleteBookAction,
      bookId,
    })

    if (!deletedBook)
      apply.status(404).send({ message: globalErrorMessage.unableToDelete })

    try {
      apply.send({
        message: globalErrorMessage.successfullyDeleted,
        deletedBook,
      })
    } catch {
      apply.status(500).send({ message: globalErrorMessage.unexpected })
    }
  })
}