import ActivitiesDAO from '../DAO/ActivitiesDAO.js';

export const postActivity = async (req, res) => {
    try {
        const { userId, cityId, description } = req.body;
        const newActivity = await ActivitiesDAO.create({ userId, cityId, description });
        
        res.status(201).json({ message: 'Activity added', activity: newActivity });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add activity' });
    }
};

export const getActivitiesByCity = async (req, res) => {
    try {
        const { cityId } = req.params;
        const activities = await ActivitiesDAO.findByCity(cityId);
        
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activities' });
    }
};

export const updateActivity = async (req, res) => {
    try {
        const { activityId } = req.params;
        const updates = req.body;  

        const updatedActivity = await ActivitiesDAO.update(activityId, updates);
        
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({ message: 'Activity updated successfully', activity: updatedActivity });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update activity' });
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const { activityId } = req.params;

        const result = await ActivitiesDAO.delete(activityId);

        if (!result) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
};
