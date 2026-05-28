export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_no: string
          created_at: string
          customer_name: string
          email: string | null
          id: string
          notes: string | null
          phone: string
          problem: string | null
          progress_stage: string
          scheduled_at: string
          service_id: string | null
          service_name: string | null
          status: string
          vehicle_info: string | null
          vehicle_type: string
        }
        Insert: {
          booking_no?: string
          created_at?: string
          customer_name: string
          email?: string | null
          id?: string
          notes?: string | null
          phone: string
          problem?: string | null
          progress_stage?: string
          scheduled_at: string
          service_id?: string | null
          service_name?: string | null
          status?: string
          vehicle_info?: string | null
          vehicle_type?: string
        }
        Update: {
          booking_no?: string
          created_at?: string
          customer_name?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone?: string
          problem?: string | null
          progress_stage?: string
          scheduled_at?: string
          service_id?: string | null
          service_name?: string | null
          status?: string
          vehicle_info?: string | null
          vehicle_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          expense_date: string
          id: string
          note: string | null
        }
        Insert: {
          amount: number
          category?: string
          created_at?: string
          expense_date?: string
          id?: string
          note?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          expense_date?: string
          id?: string
          note?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string
          title: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url: string
          title?: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          category: string | null
          created_at: string
          id: string
          low_threshold: number
          name: string
          qty: number
          sku: string | null
          unit_price: number
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          low_threshold?: number
          name: string
          qty?: number
          sku?: string | null
          unit_price?: number
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          low_threshold?: number
          name?: string
          qty?: number
          sku?: string | null
          unit_price?: number
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          discount: number
          gst_amount: number
          gst_rate: number
          id: string
          invoice_no: string
          items: Json
          notes: string | null
          status: string
          subtotal: number
          total: number
          vehicle_info: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          discount?: number
          gst_amount?: number
          gst_rate?: number
          id?: string
          invoice_no?: string
          items?: Json
          notes?: string | null
          status?: string
          subtotal?: number
          total?: number
          vehicle_info?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          discount?: number
          gst_amount?: number
          gst_rate?: number
          id?: string
          invoice_no?: string
          items?: Json
          notes?: string | null
          status?: string
          subtotal?: number
          total?: number
          vehicle_info?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          active: boolean
          badge: string | null
          body: string
          created_at: string
          display_order: number
          id: string
          title: string
        }
        Insert: {
          active?: boolean
          badge?: string | null
          body?: string
          created_at?: string
          display_order?: number
          id?: string
          title: string
        }
        Update: {
          active?: boolean
          badge?: string | null
          body?: string
          created_at?: string
          display_order?: number
          id?: string
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          category: string
          code: string
          created_at: string
          description: string
          display_order: number
          duration_min: number
          icon: string | null
          id: string
          name: string
          price: number
        }
        Insert: {
          active?: boolean
          category?: string
          code: string
          created_at?: string
          description?: string
          display_order?: number
          duration_min?: number
          icon?: string | null
          id?: string
          name: string
          price?: number
        }
        Update: {
          active?: boolean
          category?: string
          code?: string
          created_at?: string
          description?: string
          display_order?: number
          duration_min?: number
          icon?: string | null
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_story: string
          address: string
          email: string
          emergency_phone: string
          facebook_url: string | null
          gst_number: string | null
          gst_rate: number
          hero_subtitle: string
          hero_title: string
          id: string
          instagram_url: string | null
          map_embed_url: string | null
          owner_name: string
          phone: string
          shop_name: string
          stats: Json
          tagline: string
          twitter_url: string | null
          updated_at: string
          whatsapp: string
          working_hours: string
        }
        Insert: {
          about_story?: string
          address?: string
          email?: string
          emergency_phone?: string
          facebook_url?: string | null
          gst_number?: string | null
          gst_rate?: number
          hero_subtitle?: string
          hero_title?: string
          id?: string
          instagram_url?: string | null
          map_embed_url?: string | null
          owner_name?: string
          phone?: string
          shop_name?: string
          stats?: Json
          tagline?: string
          twitter_url?: string | null
          updated_at?: string
          whatsapp?: string
          working_hours?: string
        }
        Update: {
          about_story?: string
          address?: string
          email?: string
          emergency_phone?: string
          facebook_url?: string | null
          gst_number?: string | null
          gst_rate?: number
          hero_subtitle?: string
          hero_title?: string
          id?: string
          instagram_url?: string | null
          map_embed_url?: string | null
          owner_name?: string
          phone?: string
          shop_name?: string
          stats?: Json
          tagline?: string
          twitter_url?: string | null
          updated_at?: string
          whatsapp?: string
          working_hours?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          active: boolean
          created_at: string
          email: string | null
          id: string
          joined_on: string | null
          name: string
          phone: string | null
          role: string
          salary: number | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          email?: string | null
          id?: string
          joined_on?: string | null
          name: string
          phone?: string | null
          role?: string
          salary?: number | null
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string | null
          id?: string
          joined_on?: string | null
          name?: string
          phone?: string | null
          role?: string
          salary?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          active: boolean
          created_at: string
          display_order: number
          id: string
          name: string
          quote: string
          rating: number
          vehicle: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          display_order?: number
          id?: string
          name: string
          quote: string
          rating?: number
          vehicle?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          quote?: string
          rating?: number
          vehicle?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          color: string | null
          created_at: string
          customer_id: string | null
          id: string
          make: string
          model: string
          notes: string | null
          reg_no: string
          vehicle_type: string
          year: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          make?: string
          model?: string
          notes?: string | null
          reg_no?: string
          vehicle_type?: string
          year?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          make?: string
          model?: string
          notes?: string | null
          reg_no?: string
          vehicle_type?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const
