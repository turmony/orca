import { useCallback, useMemo, useState } from 'react'
import type {
  NativeChatComposerNotice,
  NativeChatComposerNoticeContent
} from './native-chat-composer-notice'

/** The composer's own paste and attachment notice, after the chat's notices. */
export function useNativeChatComposerNotice(chatNotices?: readonly NativeChatComposerNotice[]): {
  notices: readonly NativeChatComposerNotice[]
  setNotice: (text: string | null, errorText?: string) => void
} {
  const [notice, setNoticeContent] = useState<NativeChatComposerNoticeContent | null>(null)
  const setNotice = useCallback(
    (text: string | null, errorText?: string) =>
      setNoticeContent(text === null ? null : { text, ...(errorText ? { errorText } : {}) }),
    []
  )
  const notices = useMemo(
    () => [
      ...(chatNotices ?? []),
      ...(notice
        ? [
            {
              key: 'composer',
              kind: 'attachment' as const,
              ...notice,
              onDismiss: () => setNotice(null)
            }
          ]
        : [])
    ],
    [chatNotices, notice, setNotice]
  )
  return { notices, setNotice }
}
