import homeRoutes from '@/modules/home/routes'
import authRoutes from '@/modules/auth/routes'
import postRoutes from '@/modules/post/routes'
import blogRoutes from '@/modules/blog/routes'

export default [...homeRoutes, ...authRoutes, ...postRoutes, ...blogRoutes]
