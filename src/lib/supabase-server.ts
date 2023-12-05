import 'server-only'

import { type User } from '@supabase/auth-helpers-nextjs'

export function getIsAdminUser(currentUser: User): boolean {
	return currentUser.email === process.env.DB_ADMIN_EMAIL
}
