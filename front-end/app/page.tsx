"use client"
import axios from 'axios'
import styles from './page.module.css'
import { FormEvent, useRef, useState } from 'react'
import * as SVG from '@/public/svg/converted'
import store from '@/store'

export default function Home() {

  const [user] = useState(store.getState().user)

  const urlInput = useRef<null | HTMLInputElement>(null)

  const [currentResponseData, setCurrentResponseData] = useState<ServerWithJsonResponse>()

  const [loading, setLoading] = useState<boolean>(false)

  // post request with original url, receives object with the shorter url
  async function submitForm(e: FormEvent) {

    e.preventDefault()

    if (urlInput.current!.value == "") {
      return
    }

    setLoading(true)

    const form = e.target as HTMLFormElement

    const { data }: { data: ServerWithJsonResponse } = await axios.post(
      `${process.env.SERVER_URL}/create-short-url`,
      {
        originalUrl: form.original_url.value
      },
      user.token && ({
        headers: {
          "Authorization": `Bearer ${(user as User).token}`
        }
      })

    )

    setCurrentResponseData(data)

    setLoading(false)

  }

  // copy the new short url
  function clipboardNewUrl() {

    var copyText = document.getElementsByTagName("a")[6] as HTMLAnchorElement;

    // copy the text inside the text field
    navigator.clipboard.writeText(copyText.innerHTML);

  }

  return (
    <div id={styles.container}>

      <div id={styles.heading_text}>
        <h1>Encurte Seus Links</h1>
        <p>Cole o link que deseja encurtar abaixo</p>
      </div>

      <div id={styles.form_container}>

        <form onSubmit={(e) => submitForm(e)} data-loading={loading}>

          <label>
            Qual URL você quer encurtar?
            <input type='url' name='original_url'
              placeholder='https://www.google.com/'
              ref={urlInput}
              pattern='/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/'
            ></input>
          </label>

          <button type='submit' disabled={loading}>
            <SVG.HandIndexThumbFill /> Encurtar
          </button>

        </form>

        <div id={styles.result_container} data-success={false}>

          {loading && (
            <span id={styles.loading}>
              <SVG.Loading />
            </span>
          )}

          {(currentResponseData?.success && loading != true) && (
            <>
              <div id={styles.success_message_container}>
                <h3>🎉 Sua URL Está Pronta! 🎉</h3>

                <div id={styles.clipboard_container}>
                  <a target='_blank'
                    href={`https://speedio-shorter-url.netlify.app/${currentResponseData.response.shortenedUrl}`}
                    id={styles.new_url}
                    title="Copiar">
                    https://speedio-shorter-url.netlify.app/{currentResponseData.response.shortenedUrl}
                  </a>

                  <button
                    onClick={() => clipboardNewUrl()}>
                    <SVG.Clipboard2
                      title="Copiar"
                      alt="Prancheta"
                      aria-label="Copiar para Área de Tarefas."
                    />
                    Copiar
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  )
}
