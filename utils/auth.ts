// Simple auth utility functions

export function getUser() {
  try {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("moobuddy_user")
      return user ? JSON.parse(user) : null
    }
    return null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export function isAuthenticated() {
  return !!getUser()
}

export function login(userData: any) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("moobuddy_user", JSON.stringify(userData))
      return true
    }
    return false
  } catch (error) {
    console.error("Error logging in:", error)
    return false
  }
}

export function logout() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("moobuddy_user")
      return true
    }
    return false
  } catch (error) {
    console.error("Error logging out:", error)
    return false
  }
}

