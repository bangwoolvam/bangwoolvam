/**
 *  Todo 항목
 */
type Todo = {
  todoNo: number
  groupNo: number
  flag: boolean
  content: string
  sort: number
  createDate: Date
  registerDate: Date
}

/**
 *  Todo 대분류
 */
type TodoGroup = {
  groupNo: number
  title: string
  Todo: [Todo?]
  sort: number
}

/**
 * 회원
 */
type Member = {
  memberId: string
  memberNm: string
}

/**
 * 회원 그룹
 */
type MemberGroup = {
  memberGroupId: string
  name: string
  role: string
}
