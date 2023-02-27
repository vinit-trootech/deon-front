import Dashboard from '../containers/App/Trader/Dashboard'
import Questionpage from '../containers/App/Pages/Questionpage'


let TraderRoutes = [
    {
        path: 'trader/dashboard',
        component: Dashboard,
        exact: true
    },
    {
        path: 'trader/users',
        component: Questionpage,
        exact: true
    }
]

export default TraderRoutes