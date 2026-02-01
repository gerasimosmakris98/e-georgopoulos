import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create admin client with service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Check if admin already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const adminExists = existingUsers?.users?.some(u => u.email === 'stgeorgo141@gmail.com')

    if (adminExists) {
      // Check if role already assigned
      const adminUser = existingUsers?.users?.find(u => u.email === 'stgeorgo141@gmail.com')
      if (adminUser) {
        const { data: roleData } = await supabaseAdmin
          .from('user_roles')
          .select('*')
          .eq('user_id', adminUser.id)
          .eq('role', 'admin')
          .single()

        if (!roleData) {
          // Assign admin role
          await supabaseAdmin.from('user_roles').insert({
            user_id: adminUser.id,
            role: 'admin'
          })
        }
      }
      
      return new Response(
        JSON.stringify({ message: 'Admin user already exists', success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create admin user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: 'stgeorgo141@gmail.com',
      password: 'Efstathios2025!',
      email_confirm: true
    })

    if (createError) {
      throw createError
    }

    if (newUser?.user) {
      // Assign admin role
      await supabaseAdmin.from('user_roles').insert({
        user_id: newUser.user.id,
        role: 'admin'
      })
    }

    return new Response(
      JSON.stringify({ message: 'Admin user created successfully', success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})