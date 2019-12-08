import dotenv from 'dotenv'
import { App } from '@slack/bolt'

import { SampleFormModal } from './Views'

dotenv.config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.command('/sample_form_modal', async ({ ack, body, context, payload }) => {
  ack()

  const user_name: string = body.user_name

  try {
    app.client.views.open({
      token: context.botToken,
      trigger_id: payload.trigger_id,
      view: SampleFormModal({ name: user_name })
    })
  } catch (error) {
    console.log(error)
  }
})

interface FormViewStateValues {
  values: {
    title: { title: { value: string } }
    tags: { tags: { value: string } }
    body: { body: { value: string } }
  }
}

app.view('send_form', async ({ ack, body, context, view }) => {
  ack()

  const user_id: string = body.user.id

  const form_view_state_values = (view.state as FormViewStateValues).values
  const form_title = form_view_state_values.title.title.value
  const form_tags = form_view_state_values.tags.tags.value
  const form_body = form_view_state_values.body.body.value


  app.client.chat.postMessage({
    token: context.botToken,
    channel: user_id,
    text: `Title: ${form_title}\nTags: ${form_tags}\nBody: ${form_body}`
  })
})

const run = async () => {
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
}

run()
