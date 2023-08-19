import VisitedDAO from '../DAO/VisitedDAO.js';


export const getCitiesVisitedByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const visitedCities = await VisitedDAO.findByUser(userId);

        res.status(200).json(visitedCities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve visited cities' });
    }
}

export const markCityAsVisited = async (req, res) => {
    try {
        const { userId, cityId } = req.params;
        const visited = await VisitedDAO.create({ userId, cityId });

        res.status(201).json({ message: 'City marked as visited', visited });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark city as visited', details: error.message  });
    }
};




