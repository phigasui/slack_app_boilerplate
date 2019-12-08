/** @jsx JSXSlack.h */
import JSXSlack, { Input, Modal, Section, Textarea } from '@speee-js/jsx-slack'

export default ({ name }: { name: string }) => {
  return JSXSlack(
    <Modal title="Article" close="Cancel" callbackId="send_form">
      <Section>
        Hello {name}!
        <p>記事を作成します。</p>
      </Section>

      <Input label="タイトル" type="text" blockId="title" actionId="title" required />
      <Input label="タグ" type="text" blockId="tags" actionId="tags" placeholder="スペース区切りで複数登録 ex.'Ruby Rails'" />
      <Textarea label="本文" blockId="body" actionId="body" required />

      <Input type="submit" value="Save" />
    </Modal>
  )
}
