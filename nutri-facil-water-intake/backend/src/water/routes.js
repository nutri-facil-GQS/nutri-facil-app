const express = require('express');
const router = express.Router();

let intakeData = {};

router.post('/:userId', (req, res) => {
    const { userId } = req.params;
    const { date, amount } = req.body;

    if (!intakeData[userId]) intakeData[userId] = [];
    intakeData[userId].push({ date, amount });
    res.status(201).json({ message: 'Intake registrado' });
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    res.json(intakeData[userId] || []);
});

module.exports = router;