'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/jaeyoung.module.css'

function Component() {
  const addData = {
    flag: useRef<IAddData['flag']>(null),
    content: useRef<IAddData['content']>(null),
  }
  const [sample, setSample] = useState([] as Todo[])
  const [addFlag, setAddFlag] = useState(true as boolean)
  /** sample Data 조회 START */
  async function getData() {
    const response = await fetch('/api/sample-jy', {
      method: 'GET',
    })
    setSample((await response.json()) ?? [])
  }
  /** sample Data 조회 END */
  useEffect(() => {
    getData()
  }, [])

  function changeValue(value: string | undefined): boolean {
    if (value === 'true') return true
    return false
  }
  /** sample Data 생성 START */
  async function createData() {
    const param = {
      content: addData.content.current?.value,
      flag: changeValue(addData.flag.current?.value),
      groupNo: sample[0].groupNo,
      sort: sample.length + 1,
      createDate: new Date(),
      registerDate: new Date(),
    }
    await fetch('/api/sample-jy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
  }
  /** sample Data 생성 END */
  /** sample Data 삭제 START */
  async function deleteData(id: string) {
    console.log(id)

    await fetch(`/api/sample-jy/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
  }
  /** sample Data 삭제 END */
  function onClickEvent(type: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventType = type.currentTarget?.id as string
    if (eventType === 'ADD') {
      setSample([...sample, { id: '' } as Todo])
      setAddFlag(false)
    }
    if (eventType === 'CANCEL') {
      sample.pop()
      setAddFlag(true)
    }
    if (eventType === 'CREATE') {
      createData()
    }
    // if (eventType === 'DELETE') {
    //   deleteData()
    // }
  }

  return (
    <div>
      <div>할일 / 여부</div>
      {sample.map((value: Todo) => (
        <div className={styles.container} key={value.id}>
          {value.id ? (
            <span className={styles.content}>
              {value.content} / {value.flag ? 'Y' : 'N'}/
              <button
                type="button"
                className={styles.deleteButton}
                id="DELETE"
                onClick={() => deleteData(value.id)}
              >
                삭제
              </button>
            </span>
          ) : (
            <span>
              <input
                type="text"
                className={styles.textContainer}
                ref={addData.content}
              />
              /
              <select defaultValue="false" ref={addData.flag}>
                <option value="false">N</option>
                <option value="true">Y</option>
              </select>
              {!addFlag ? (
                ''
              ) : (
                <span>
                  <button
                    type="button"
                    className={styles.createButton}
                    id="CREATE"
                    onClick={onClickEvent}
                  >
                    생성
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    id="CANCEL"
                    onClick={onClickEvent}
                  >
                    취소
                  </button>
                </span>
              )}
              <button
                type="button"
                className={styles.createButton}
                id="CREATE"
                onClick={onClickEvent}
              >
                생성
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                id="CANCEL"
                onClick={onClickEvent}
              >
                취소
              </button>
            </span>
          )}
        </div>
      ))}
      {addFlag ? (
        <button
          className={styles.addButton}
          type="button"
          id="ADD"
          onClick={onClickEvent}
        >
          ADD
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Component
