const { createClient } = require("@supabase/supabase-js/dist/index.cjs")
const { InvalidDataError } = require("../lib/errors")
const { fetchUserInfo, editUserInfo } = require("../services/profileService")


const index = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await fetchUserInfo(userId)

        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const update = async (req, res) => {
    const { username, email, fName, lName } = req.body
    const userId = req.user.id

    try {
        const user = await editUserInfo(userId, username, email, fName, lName)

        return res.json({ user })
    } catch (error) {
        if(error instanceof InvalidDataError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const getUserInfo = async (req, res) => {
    const userId = parseInt(req.params.id)

    try {
        const user = await fetchUserInfo(userId)

        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const profileUrl = async (req, res) => {
    const fileName = `${Date.now()}_${crypto.randomUUID()}.jpg`
    const filePath = `profile-pics/${fileName}`
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

    if(!filePath) {
        return res.status(400).json({ error: 'Path parameter is required' })
    }

    const { data, error } = await supabase.storage
        .from('odin-book')
        .createSignedUploadUrl(filePath, 60)

    if (error) {
        return res.status(500).json({ error: error })
    }

    return res.json({ signedUrl: data.signedUrl })
}

module.exports = {
    index,
    update,
    getUserInfo,
    profileUrl
}