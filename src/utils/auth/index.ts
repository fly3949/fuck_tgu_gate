import AV from 'leancloud-storage'
import storage from '@/utils/storage'

AV.init({
  appId: 'YBxsVxdMrddCCq0GQEXkCVeM-gzGzoHsz',
  appKey: 'UDx0nuw9MpvTDtzhPoXFWda7',
  serverURL: 'https://ybxsvxdm.lc-cn-n1-shared.com'
})

export const checkLocalUser = async (): Promise<void> => {
  if (!storage.get('USERNAME') || !storage.get('PASSWORD')) {
    throw new Error('no local user')
  }

  return await login(storage.get('USERNAME'), storage.get('PASSWORD'))
}

export const login = async (username: string, password: string): Promise<void> => {
  try {
    await AV.User.logIn(username, password)
    storage.set('USERNAME', username)
    storage.set('PASSWORD', password)
  } catch (e) {
    console.error(e)
    storage.remove('USERNAME')
    storage.remove('PASSWORD')
    throw e
  }
}
