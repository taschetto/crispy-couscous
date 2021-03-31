import { setupWorker, rest } from 'msw'

const DELAY_MS = 1000

const handlers = [
  rest.post('/example01', (req, res, ctx) =>
    res(ctx.delay(DELAY_MS), ctx.status(201))
  ),
]

export const worker = setupWorker(...handlers)
