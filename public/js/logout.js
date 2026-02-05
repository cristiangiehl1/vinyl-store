export async function logout() {
  try {
    await fetch('/api/sessions', {
      method: 'DELETE',
      credentials: 'include',
    })
    window.location.href = '/'
  } catch (err) {
    console.log('failed to log out', err)
  }
}
