import { setupWorker, rest } from 'msw'
import { CREATED, UNPROCESSABLE_ENTITY } from 'http-status'

const DELAY_MS = 1000

const handlers = [
  rest.post('/created', (req, res, ctx) =>
    res(ctx.delay(DELAY_MS), ctx.status(CREATED))
  ),
  rest.post('/example05', (req, res, ctx) =>
    res(
      ctx.delay(DELAY_MS),
      ctx.status(UNPROCESSABLE_ENTITY),
      ctx.json({
        firstName: 'Your first name is weird.',
        lastName:
          'Your family is banned from our API. Your uncle Ted can tell you why.',
      })
    )
  ),
]

export const worker = setupWorker(...handlers)
