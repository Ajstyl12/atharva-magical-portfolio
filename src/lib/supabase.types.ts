// Auto-generated Supabase TypeScript types
// Reflects the portfolio_backend_setup migration

export type Database = {
  public: {
    Tables: {
      owl_post_messages: {
        Row: {
          id: string;
          created_at: string;
          sender_name: string;
          sender_email: string;
          subject: string;
          message: string;
          is_read: boolean;
          house_theme: string | null;
          ip_country: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          sender_name: string;
          sender_email: string;
          subject: string;
          message: string;
          is_read?: boolean;
          house_theme?: string | null;
          ip_country?: string | null;
        };
        Update: Partial<Database['public']['Tables']['owl_post_messages']['Insert']>;
      };
      visitor_analytics: {
        Row: {
          id: string;
          created_at: string;
          session_id: string;
          page: string;
          referrer: string | null;
          user_agent: string | null;
          country: string | null;
          house_theme: string | null;
          theme_mode: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          session_id: string;
          page?: string;
          referrer?: string | null;
          user_agent?: string | null;
          country?: string | null;
          house_theme?: string | null;
          theme_mode?: string | null;
        };
        Update: Partial<Database['public']['Tables']['visitor_analytics']['Insert']>;
      };
      section_engagements: {
        Row: {
          id: string;
          created_at: string;
          session_id: string;
          section_id: string;
          time_spent_ms: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          session_id: string;
          section_id: string;
          time_spent_ms?: number | null;
        };
        Update: Partial<Database['public']['Tables']['section_engagements']['Insert']>;
      };
      project_clicks: {
        Row: {
          id: string;
          created_at: string;
          project_id: string;
          project_name: string;
          click_type: string;
          session_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          project_id: string;
          project_name: string;
          click_type?: string;
          session_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['project_clicks']['Insert']>;
      };
      visitor_counter: {
        Row: {
          id: number;
          total_visits: number;
          updated_at: string;
        };
        Insert: {
          id?: number;
          total_visits?: number;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['visitor_counter']['Insert']>;
      };
    };
    Functions: {
      increment_visitor_count: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
  };
};
