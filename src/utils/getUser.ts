const uid = localStorage.getItem('uid')

export const isLogin = uid
export const uname = localStorage.getItem('uname')
export const updateData = localStorage.getItem('updateData') === 'true'
export { uid }
