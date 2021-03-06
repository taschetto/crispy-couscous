import { setupWorker, rest } from 'msw'
import { CONFLICT, CREATED, UNPROCESSABLE_ENTITY } from 'http-status'

const DELAY_MS = 1000

const handlers = [
  rest.post('/created', (req, res, ctx) =>
    res(ctx.delay(DELAY_MS), ctx.status(CREATED))
  ),
  rest.post('/unprocessable-entity', (req, res, ctx) =>
    res(
      ctx.delay(DELAY_MS),
      ctx.status(UNPROCESSABLE_ENTITY),
      ctx.json({
        errors: [
          { name: 'firstName', message: 'Your first name is weird.' },
          {
            name: 'lastName',
            message:
              'Your family is banned from our API. Your uncle Ted can tell you why.',
          },
        ],
      })
    )
  ),
  rest.post('/conflict', (req, res, ctx) =>
    res(
      ctx.delay(DELAY_MS),
      ctx.status(CONFLICT),
      ctx.json({
        message: 'A conflict occurred.',
      })
    )
  ),
]

export const worker = setupWorker(...handlers)
