export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amulets: {
        Row: {
          downloaded_at: string | null
          generated_at: string
          id: string
          image_url: string | null
          payment_status: string | null
          price: number | null
          saju_id: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          downloaded_at?: string | null
          generated_at?: string
          id?: string
          image_url?: string | null
          payment_status?: string | null
          price?: number | null
          saju_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          downloaded_at?: string | null
          generated_at?: string
          id?: string
          image_url?: string | null
          payment_status?: string | null
          price?: number | null
          saju_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "amulets_saju_id_fkey"
            columns: ["saju_id"]
            isOneToOne: false
            referencedRelation: "saju_results"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          bot_response: string | null
          context_type: string | null
          conversation_id: string | null
          id: string
          timestamp: string
          user_id: string | null
          user_input: string | null
          attachments: {
            type: 'image' | 'file'
            url: string
            name: string
          }[] | null
        }
        Insert: {
          bot_response?: string | null
          context_type?: string | null
          conversation_id?: string | null
          id?: string
          timestamp?: string
          user_id?: string | null
          user_input?: string | null
          attachments?: {
            type: 'image' | 'file'
            url: string
            name: string
          }[] | null
        }
        Update: {
          bot_response?: string | null
          context_type?: string | null
          conversation_id?: string | null
          id?: string
          timestamp?: string
          user_id?: string | null
          user_input?: string | null
          attachments?: {
            type: 'image' | 'file'
            url: string
            name: string
          }[] | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          consultant_id: string | null
          created_at: string
          datetime: string | null
          id: string
          payment_status: string | null
          price: number | null
          status: string | null
          user_id: string | null
          zoom_link: string | null
        }
        Insert: {
          consultant_id?: string | null
          created_at?: string
          datetime?: string | null
          id?: string
          payment_status?: string | null
          price?: number | null
          status?: string | null
          user_id?: string | null
          zoom_link?: string | null
        }
        Update: {
          consultant_id?: string | null
          created_at?: string
          datetime?: string | null
          id?: string
          payment_status?: string | null
          price?: number | null
          status?: string | null
          user_id?: string | null
          zoom_link?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          service_type: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone: string
          service_type: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          service_type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          birth_time: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          language: string | null
          membership_type: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          birth_date?: string | null
          birth_time?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id: string
          language?: string | null
          membership_type?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          birth_date?: string | null
          birth_time?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          language?: string | null
          membership_type?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          generated_at: string
          id: string
          payment_status: string | null
          pdf_url: string | null
          price: number | null
          saju_id: string | null
          user_id: string | null
        }
        Insert: {
          generated_at?: string
          id?: string
          payment_status?: string | null
          pdf_url?: string | null
          price?: number | null
          saju_id?: string | null
          user_id?: string | null
        }
        Update: {
          generated_at?: string
          id?: string
          payment_status?: string | null
          pdf_url?: string | null
          price?: number | null
          saju_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_saju_id_fkey"
            columns: ["saju_id"]
            isOneToOne: false
            referencedRelation: "saju_results"
            referencedColumns: ["id"]
          },
        ]
      }
      saju_results: {
        Row: {
          birth_day: number
          birth_hour: number | null
          birth_minute: number | null
          birth_month: number
          birth_year: number
          birthplace: string | null
          date_generated: string
          gender: string | null
          id: string
          parsed_result: Json | null
          raw_data: Json | null
          user_id: string | null
        }
        Insert: {
          birth_day: number
          birth_hour?: number | null
          birth_minute?: number | null
          birth_month: number
          birth_year: number
          birthplace?: string | null
          date_generated?: string
          gender?: string | null
          id?: string
          parsed_result?: Json | null
          raw_data?: Json | null
          user_id?: string | null
        }
        Update: {
          birth_day?: number
          birth_hour?: number | null
          birth_minute?: number | null
          birth_month?: number
          birth_year?: number
          birthplace?: string | null
          date_generated?: string
          gender?: string | null
          id?: string
          parsed_result?: Json | null
          raw_data?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
