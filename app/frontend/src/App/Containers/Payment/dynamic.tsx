import Loadable from 'react-loadable'
import Loader from '../../../Common/Components/Loader'

const DynamicPaymentContainer = Loadable<{}, {}>({
  loader: () => import('./index'),
  loading: Loader,
  delay: 300,
  timeout: 10000
} as any)

export default DynamicPaymentContainer
