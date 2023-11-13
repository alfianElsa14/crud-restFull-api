const express = require('express')
const fs = require('fs')
const joi = require('joi')
const { hash } = require('./bcrypt')
const app = express()
const port = 3000
const database = './db.json'
const data = JSON.parse(fs.readFileSync(database))

const handleServerError = (res) => {
    return res.status(500).json({ message: 'Internal server error' })
}

const handleClientError = (res, status, message) => {
    return res.status(status).json({ message })
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/users', (req, res) => {
    try {
        const userData = data.users.map(el => {
            el.password = hash(el.password)

            return el
        })

        res.status(200).json(userData)
    } catch (error) {
        return handleServerError
    }
})


app.post('/users/add', (req, res) => {
    try {
        const newUser = req.body;

        const schema = joi.object({
            fullName: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),
            gender: joi.string().required(),
        });

        const { error } = schema.validate(newUser);

        if (error) {
            return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message });
        }

        if (data.users.find((el) => el.email.toLowerCase() === newUser.email.toLowerCase())) {
            return handleClientError(res, 400, 'Email Already Exist');
        }

        data.users.push(newUser);

        const userData = data.users.map(el => {
            el.password = hash(el.password)

            return el
        })

        fs.writeFileSync(database, JSON.stringify(data));

        return res.status(201).json({ users: newUser, message: 'success' });
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
})


app.put('/users/edit/:email', (req, res) => {
    try {
        const { email } = req.params

        const newData = req.body

        const schema = joi.object({
            fullName: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(6).required(),
            gender: joi.string().required(),
        });

        const { error } = schema.validate(newData);
        if (error) {
            res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
        }

        if (data.users.find((el) => el.email.toLowerCase() === newData.email.toLowerCase())) {
            return handleClientError(res, 400, 'Email Already Exist');
        }

        if (!data.users.find((el) => el.email.toLowerCase() === email.toLowerCase())) {
            return handleClientError(res, 404, 'Data Not Found');
        }

        const filtered = data.users.filter((el) => el.email.toLowerCase() !== email.toLowerCase());

        filtered.push(newData);

        data.users = filtered;

        fs.writeFileSync(database, JSON.stringify(data));

        return res.status(200).json({ data: newData, message: 'success' })

    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
})


app.delete('/users/:email', (req, res) => {
    try {
        const { email } = req.params

        if(!data.users.find((el) => el.email.toLowerCase() == email.toLowerCase())) {

            return handleClientError(res, 404, 'Data Not Found');
        }

        const filtered = data.users.filter((el) => el.email.toLowerCase() !== email.toLowerCase());

        data.users = filtered

        fs.writeFileSync(database, JSON.stringify(data));

        return res.status(200).json({ data: data.users, message: 'success' })
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }

})


app.get('/users/:email', (req, res) => {
    try {
        const { email } = req.params;

        if (!data.users.find((el) => el.email.toLowerCase() === email.toLowerCase())) {
            return handleClientError(res, 404, 'Data Not Found');
        }

        const selectedUser = data.users.filter((el) => el.email.toLowerCase() === email.toLowerCase());

        res.status(200).json({ selectedUser });
    } catch (error) {
        return handleServerError(res);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})