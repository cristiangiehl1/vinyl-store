export async function logout() {
  try {
    await fetch('/api/auth/logout/')
    window.location.href = '/'
  } catch (err) {
    console.log('failed to log out', err)
  }
}
