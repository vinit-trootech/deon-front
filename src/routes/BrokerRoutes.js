import Questionpage from '../containers/App/Pages/Questionpage'
import Dashboard from '../containers/App/Broker/Dashboard'


let BrokerRoutes = [
    {
        path: 'broker/dashboard',
        component: Dashboard,
        exact: true
    },
    {
        path: 'broker/users',
        component: Questionpage,
        exact: true
    }
]

export default BrokerRoutes