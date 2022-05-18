import bcrypt from "bcrypt"

export const passwordHashing = async (plainPassword) => {
    try {
        // just 2, not secure, to reduce cloud hosting resource consumption
        const salt = await bcrypt.genSalt(2)
        return await bcrypt.hash(plainPassword, salt)
    } catch (error) {
        console.log(error)
    }
}


export const isValidPassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword)
    } catch (error) {
        console.log(error)
    }
}