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
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      advances: {
        Row: {
          amount: number | null
          created_at: string
          created_by: string | null
          id: string
          reason: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      branch_simple_diaries: {
        Row: {
          arrived: number
          branch_user_id: string
          created_at: string
          deleted_at: string | null
          descent_discount: number
          descent_orders_count: number
          descent_pieces_count: number
          descent_value: number
          diary_date: string
          id: string
          new_diary_orders_count: number
          new_diary_pieces_count: number
          new_diary_value: number
          notes: string | null
          previous_him: number
          previous_us: number
          reject_shipping: number
          return_count: number
          return_pieces_count: number
          return_value: number
          title: string
          updated_at: string
        }
        Insert: {
          arrived?: number
          branch_user_id: string
          created_at?: string
          deleted_at?: string | null
          descent_discount?: number
          descent_orders_count?: number
          descent_pieces_count?: number
          descent_value?: number
          diary_date?: string
          id?: string
          new_diary_orders_count?: number
          new_diary_pieces_count?: number
          new_diary_value?: number
          notes?: string | null
          previous_him?: number
          previous_us?: number
          reject_shipping?: number
          return_count?: number
          return_pieces_count?: number
          return_value?: number
          title?: string
          updated_at?: string
        }
        Update: {
          arrived?: number
          branch_user_id?: string
          created_at?: string
          deleted_at?: string | null
          descent_discount?: number
          descent_orders_count?: number
          descent_pieces_count?: number
          descent_value?: number
          diary_date?: string
          id?: string
          new_diary_orders_count?: number
          new_diary_pieces_count?: number
          new_diary_value?: number
          notes?: string | null
          previous_him?: number
          previous_us?: number
          reject_shipping?: number
          return_count?: number
          return_pieces_count?: number
          return_value?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cash_flow_entries: {
        Row: {
          amount: number | null
          created_at: string
          created_by: string | null
          entry_date: string | null
          id: string
          notes: string | null
          office_id: string | null
          reason: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          created_by?: string | null
          entry_date?: string | null
          id?: string
          notes?: string | null
          office_id?: string | null
          reason?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          created_by?: string | null
          entry_date?: string | null
          id?: string
          notes?: string | null
          office_id?: string | null
          reason?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_flow_entries_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          agreement_price: number | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          agreement_price?: number | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          agreement_price?: number | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_payments: {
        Row: {
          amount: number | null
          company_id: string
          created_at: string
          id: string
          notes: string | null
          paid_by: string | null
        }
        Insert: {
          amount?: number | null
          company_id: string
          created_at?: string
          id?: string
          notes?: string | null
          paid_by?: string | null
        }
        Update: {
          amount?: number | null
          company_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          paid_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_payments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      courier_applications: {
        Row: {
          address: string
          agreed_amount: number
          coverage_areas: string
          created_at: string
          created_by: string | null
          current_job: string
          full_name: string
          id: string
          notes: string
          phone: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: string
          agreed_amount?: number
          coverage_areas?: string
          created_at?: string
          created_by?: string | null
          current_job?: string
          full_name: string
          id?: string
          notes?: string
          phone?: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string
          agreed_amount?: number
          coverage_areas?: string
          created_at?: string
          created_by?: string | null
          current_job?: string
          full_name?: string
          id?: string
          notes?: string
          phone?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      courier_bonuses: {
        Row: {
          amount: number | null
          courier_id: string
          created_at: string
          created_by: string | null
          id: string
          reason: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          courier_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          courier_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
          type?: string | null
        }
        Relationships: []
      }
      courier_collections: {
        Row: {
          amount: number | null
          collected_by: string | null
          courier_id: string | null
          created_at: string
          id: string
          order_id: string | null
        }
        Insert: {
          amount?: number | null
          collected_by?: string | null
          courier_id?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
        }
        Update: {
          amount?: number | null
          collected_by?: string | null
          courier_id?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courier_collections_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      courier_leaves: {
        Row: {
          approved_by: string | null
          courier_id: string
          created_at: string
          id: string
          leave_date: string
          reason: string | null
          status: string
        }
        Insert: {
          approved_by?: string | null
          courier_id: string
          created_at?: string
          id?: string
          leave_date: string
          reason?: string | null
          status?: string
        }
        Update: {
          approved_by?: string | null
          courier_id?: string
          created_at?: string
          id?: string
          leave_date?: string
          reason?: string | null
          status?: string
        }
        Relationships: []
      }
      courier_locations: {
        Row: {
          accuracy: number | null
          courier_id: string
          id: string
          latitude: number
          longitude: number
          updated_at: string
        }
        Insert: {
          accuracy?: number | null
          courier_id: string
          id?: string
          latitude: number
          longitude: number
          updated_at?: string
        }
        Update: {
          accuracy?: number | null
          courier_id?: string
          id?: string
          latitude?: number
          longitude?: number
          updated_at?: string
        }
        Relationships: []
      }
      courier_ratings: {
        Row: {
          courier_id: string
          created_at: string
          id: string
          month: number
          notes: string | null
          rated_by: string | null
          rating: number
          year: number
        }
        Insert: {
          courier_id: string
          created_at?: string
          id?: string
          month: number
          notes?: string | null
          rated_by?: string | null
          rating?: number
          year: number
        }
        Update: {
          courier_id?: string
          created_at?: string
          id?: string
          month?: number
          notes?: string | null
          rated_by?: string | null
          rating?: number
          year?: number
        }
        Relationships: []
      }
      courier_rewards: {
        Row: {
          courier_id: string
          created_at: string
          deliveries_count: number
          id: string
          is_paid: boolean
          reward_amount: number
          reward_date: string
        }
        Insert: {
          courier_id: string
          created_at?: string
          deliveries_count?: number
          id?: string
          is_paid?: boolean
          reward_amount?: number
          reward_date?: string
        }
        Update: {
          courier_id?: string
          created_at?: string
          deliveries_count?: number
          id?: string
          is_paid?: boolean
          reward_amount?: number
          reward_date?: string
        }
        Relationships: []
      }
      courier_violations: {
        Row: {
          courier_id: string
          created_at: string
          created_by: string | null
          id: string
          reason: string
          violation_type: string
        }
        Insert: {
          courier_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string
          violation_type?: string
        }
        Update: {
          courier_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string
          violation_type?: string
        }
        Relationships: []
      }
      customer_complaints: {
        Row: {
          complaint_text: string
          created_at: string
          created_by: string | null
          customer_name: string
          customer_phone: string
          id: string
          order_id: string | null
          resolution: string | null
          resolved_at: string | null
          status: string
        }
        Insert: {
          complaint_text?: string
          created_at?: string
          created_by?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          order_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
        }
        Update: {
          complaint_text?: string
          created_at?: string
          created_by?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          order_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_closing_diaries: {
        Row: {
          created_at: string
          diary_date: string
          id: string
          notes: string
          office_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          diary_date?: string
          id?: string
          notes?: string
          office_id: string
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          diary_date?: string
          id?: string
          notes?: string
          office_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_closing_entries: {
        Row: {
          copied_from_diary_id: string | null
          created_at: string
          diary_id: string
          id: string
          note: string
          order_id: string
        }
        Insert: {
          copied_from_diary_id?: string | null
          created_at?: string
          diary_id: string
          id?: string
          note?: string
          order_id: string
        }
        Update: {
          copied_from_diary_id?: string | null
          created_at?: string
          diary_id?: string
          id?: string
          note?: string
          order_id?: string
        }
        Relationships: []
      }
      delivery_prices: {
        Row: {
          created_at: string
          governorate: string
          id: string
          office_id: string
          pickup_price: number | null
          price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          governorate: string
          id?: string
          office_id: string
          pickup_price?: number | null
          price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          governorate?: string
          id?: string
          office_id?: string
          pickup_price?: number | null
          price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_prices_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      diaries: {
        Row: {
          balance: number | null
          cash_arrived_entries: Json | null
          closed_at: string | null
          created_at: string
          deleted_at: string | null
          diary_date: string
          diary_number: number
          id: string
          is_archived: boolean | null
          is_closed: boolean | null
          lock_status_updates: boolean | null
          manual_arrived_total: number | null
          office_id: string
          orange_extra_due: number
          orange_extra_due_reason: string
          prevent_new_orders: boolean | null
          previous_due: number | null
          show_postponed_due: boolean | null
          updated_at: string
        }
        Insert: {
          balance?: number | null
          cash_arrived_entries?: Json | null
          closed_at?: string | null
          created_at?: string
          deleted_at?: string | null
          diary_date?: string
          diary_number?: number
          id?: string
          is_archived?: boolean | null
          is_closed?: boolean | null
          lock_status_updates?: boolean | null
          manual_arrived_total?: number | null
          office_id: string
          orange_extra_due?: number
          orange_extra_due_reason?: string
          prevent_new_orders?: boolean | null
          previous_due?: number | null
          show_postponed_due?: boolean | null
          updated_at?: string
        }
        Update: {
          balance?: number | null
          cash_arrived_entries?: Json | null
          closed_at?: string | null
          created_at?: string
          deleted_at?: string | null
          diary_date?: string
          diary_number?: number
          id?: string
          is_archived?: boolean | null
          is_closed?: boolean | null
          lock_status_updates?: boolean | null
          manual_arrived_total?: number | null
          office_id?: string
          orange_extra_due?: number
          orange_extra_due_reason?: string
          prevent_new_orders?: boolean | null
          previous_due?: number | null
          show_postponed_due?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diaries_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      diary_orders: {
        Row: {
          copied_from_diary_id: string | null
          copied_from_diary_order_id: string | null
          created_at: string
          diary_id: string
          id: string
          locked_status: boolean
          manual_arrived: number | null
          manual_collected: number | null
          manual_delivery_commission: number | null
          manual_pickup: number | null
          manual_reject_no_ship: number | null
          manual_return_penalty: number | null
          manual_return_status: string | null
          manual_shipping: number | null
          manual_shipping_amount: number | null
          manual_shipping_diff: number | null
          manual_total_amount: number | null
          n_column: string | null
          notes: string
          order_id: string
          partial_amount: number | null
          status_inside_diary: string | null
        }
        Insert: {
          copied_from_diary_id?: string | null
          copied_from_diary_order_id?: string | null
          created_at?: string
          diary_id: string
          id?: string
          locked_status?: boolean
          manual_arrived?: number | null
          manual_collected?: number | null
          manual_delivery_commission?: number | null
          manual_pickup?: number | null
          manual_reject_no_ship?: number | null
          manual_return_penalty?: number | null
          manual_return_status?: string | null
          manual_shipping?: number | null
          manual_shipping_amount?: number | null
          manual_shipping_diff?: number | null
          manual_total_amount?: number | null
          n_column?: string | null
          notes?: string
          order_id: string
          partial_amount?: number | null
          status_inside_diary?: string | null
        }
        Update: {
          copied_from_diary_id?: string | null
          copied_from_diary_order_id?: string | null
          created_at?: string
          diary_id?: string
          id?: string
          locked_status?: boolean
          manual_arrived?: number | null
          manual_collected?: number | null
          manual_delivery_commission?: number | null
          manual_pickup?: number | null
          manual_reject_no_ship?: number | null
          manual_return_penalty?: number | null
          manual_return_status?: string | null
          manual_shipping?: number | null
          manual_shipping_amount?: number | null
          manual_shipping_diff?: number | null
          manual_total_amount?: number | null
          n_column?: string | null
          notes?: string
          order_id?: string
          partial_amount?: number | null
          status_inside_diary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diary_orders_diary_id_fkey"
            columns: ["diary_id"]
            isOneToOne: false
            referencedRelation: "diaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diary_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string
          expense_date: string | null
          expense_name: string
          id: string
          notes: string | null
          office_id: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string
          expense_date?: string | null
          expense_name: string
          id?: string
          notes?: string | null
          office_id?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string
          expense_date?: string | null
          expense_name?: string
          id?: string
          notes?: string | null
          office_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      fuel_entries: {
        Row: {
          amount: number
          courier_id: string
          created_at: string
          created_by: string | null
          entry_date: string
          id: string
          liters: number | null
          notes: string | null
        }
        Insert: {
          amount?: number
          courier_id: string
          created_at?: string
          created_by?: string | null
          entry_date?: string
          id?: string
          liters?: number | null
          notes?: string | null
        }
        Update: {
          amount?: number
          courier_id?: string
          created_at?: string
          created_by?: string | null
          entry_date?: string
          id?: string
          liters?: number | null
          notes?: string | null
        }
        Relationships: []
      }
      internal_tickets: {
        Row: {
          assigned_to: string | null
          closed_at: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          priority: string
          status: string
          title: string
        }
        Insert: {
          assigned_to?: string | null
          closed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          priority?: string
          status?: string
          title?: string
        }
        Update: {
          assigned_to?: string | null
          closed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          priority?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      inventory_items: {
        Row: {
          category: string | null
          created_at: string
          id: string
          item_name: string
          location: string | null
          min_quantity: number
          notes: string | null
          quantity: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          item_name?: string
          location?: string | null
          min_quantity?: number
          notes?: string | null
          quantity?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          item_name?: string
          location?: string | null
          min_quantity?: number
          notes?: string | null
          quantity?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      office_daily_closings: {
        Row: {
          closing_date: string
          created_at: string
          data_json: Json | null
          id: string
          is_closed: boolean | null
          is_locked: boolean | null
          office_id: string
          pickup_rate: number | null
          prevent_add: boolean | null
          updated_at: string
        }
        Insert: {
          closing_date?: string
          created_at?: string
          data_json?: Json | null
          id?: string
          is_closed?: boolean | null
          is_locked?: boolean | null
          office_id: string
          pickup_rate?: number | null
          prevent_add?: boolean | null
          updated_at?: string
        }
        Update: {
          closing_date?: string
          created_at?: string
          data_json?: Json | null
          id?: string
          is_closed?: boolean | null
          is_locked?: boolean | null
          office_id?: string
          pickup_rate?: number | null
          prevent_add?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "office_daily_closings_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      office_daily_expenses: {
        Row: {
          amount: number | null
          category: string
          created_at: string
          created_by: string | null
          expense_date: string
          id: string
          notes: string | null
          office_id: string | null
        }
        Insert: {
          amount?: number | null
          category?: string
          created_at?: string
          created_by?: string | null
          expense_date?: string
          id?: string
          notes?: string | null
          office_id?: string | null
        }
        Update: {
          amount?: number | null
          category?: string
          created_at?: string
          created_by?: string | null
          expense_date?: string
          id?: string
          notes?: string | null
          office_id?: string | null
        }
        Relationships: []
      }
      office_payments: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          notes: string | null
          office_id: string
          paid_by: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          office_id: string
          paid_by?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          office_id?: string
          paid_by?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "office_payments_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      office_report_hidden_orders: {
        Row: {
          created_at: string
          hidden_by: string | null
          id: string
          order_id: string
        }
        Insert: {
          created_at?: string
          hidden_by?: string | null
          id?: string
          order_id: string
        }
        Update: {
          created_at?: string
          hidden_by?: string | null
          id?: string
          order_id?: string
        }
        Relationships: []
      }
      office_report_notes: {
        Row: {
          created_at: string
          id: string
          note: string
          order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string
          order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          order_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      office_simple_diaries: {
        Row: {
          arrived: number
          created_at: string
          created_by: string | null
          customer_due_direction: string
          deleted_at: string | null
          descent_discount: number
          descent_orders_count: number
          descent_pieces_count: number
          descent_value: number
          diary_date: string
          id: string
          net_diary_direction: string
          net_with_descent_direction: string
          new_diary_orders_count: number
          new_diary_pieces_count: number
          new_diary_value: number
          notes: string | null
          office_id: string
          previous_him: number
          previous_us: number
          reject_shipping: number
          return_count: number
          return_pieces_count: number
          return_value: number
          updated_at: string
        }
        Insert: {
          arrived?: number
          created_at?: string
          created_by?: string | null
          customer_due_direction?: string
          deleted_at?: string | null
          descent_discount?: number
          descent_orders_count?: number
          descent_pieces_count?: number
          descent_value?: number
          diary_date?: string
          id?: string
          net_diary_direction?: string
          net_with_descent_direction?: string
          new_diary_orders_count?: number
          new_diary_pieces_count?: number
          new_diary_value?: number
          notes?: string | null
          office_id: string
          previous_him?: number
          previous_us?: number
          reject_shipping?: number
          return_count?: number
          return_pieces_count?: number
          return_value?: number
          updated_at?: string
        }
        Update: {
          arrived?: number
          created_at?: string
          created_by?: string | null
          customer_due_direction?: string
          deleted_at?: string | null
          descent_discount?: number
          descent_orders_count?: number
          descent_pieces_count?: number
          descent_value?: number
          diary_date?: string
          id?: string
          net_diary_direction?: string
          net_with_descent_direction?: string
          new_diary_orders_count?: number
          new_diary_pieces_count?: number
          new_diary_value?: number
          notes?: string | null
          office_id?: string
          previous_him?: number
          previous_us?: number
          reject_shipping?: number
          return_count?: number
          return_pieces_count?: number
          return_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      offices: {
        Row: {
          address: string | null
          can_add_orders: boolean | null
          created_at: string
          id: string
          name: string
          notes: string | null
          office_commission: number | null
          owner_name: string | null
          owner_phone: string | null
          phone: string | null
          specialty: string | null
        }
        Insert: {
          address?: string | null
          can_add_orders?: boolean | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          office_commission?: number | null
          owner_name?: string | null
          owner_phone?: string | null
          phone?: string | null
          specialty?: string | null
        }
        Update: {
          address?: string | null
          can_add_orders?: boolean | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          office_commission?: number | null
          owner_name?: string | null
          owner_phone?: string | null
          phone?: string | null
          specialty?: string | null
        }
        Relationships: []
      }
      order_notes: {
        Row: {
          created_at: string
          id: string
          note: string
          order_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          order_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          order_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_notes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_schedules: {
        Row: {
          any_time: boolean
          created_at: string
          id: string
          notes: string
          order_id: string
          scheduled_date: string | null
          time_from: string | null
          time_to: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          any_time?: boolean
          created_at?: string
          id?: string
          notes?: string
          order_id: string
          scheduled_date?: string | null
          time_from?: string | null
          time_to?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          any_time?: boolean
          created_at?: string
          id?: string
          notes?: string
          order_id?: string
          scheduled_date?: string | null
          time_from?: string | null
          time_to?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          id: string
          new_status_id: string | null
          old_status_id: string | null
          order_id: string
          source: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_status_id?: string | null
          old_status_id?: string | null
          order_id: string
          source?: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_status_id?: string | null
          old_status_id?: string | null
          order_id?: string
          source?: string
        }
        Relationships: []
      }
      order_statuses: {
        Row: {
          color: string | null
          created_at: string
          id: string
          is_fixed: boolean
          name: string
          sort_order: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          is_fixed?: boolean
          name: string
          sort_order?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          is_fixed?: boolean
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string | null
          approved_at: string | null
          approved_by: string | null
          barcode: string | null
          branch_label: string | null
          closed_at: string | null
          closed_by: string | null
          color: string | null
          company_id: string | null
          confirmation_status: string | null
          confirmation_token: string | null
          courier_assigned_at: string | null
          courier_closed_by: string | null
          courier_commission: number | null
          courier_id: string | null
          courier_name_snapshot: string | null
          created_at: string
          created_by: string | null
          customer_code: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          delivery_price: number | null
          governorate: string | null
          id: string
          is_closed: boolean | null
          is_courier_closed: boolean | null
          is_pending_approval: boolean
          is_settled: boolean | null
          last_modified_by: string | null
          notes: string | null
          office_id: string | null
          office_name_snapshot: string | null
          partial_amount: number | null
          payment_method: string | null
          price: number | null
          priority: string | null
          product_id: string | null
          product_name: string | null
          quantity: number | null
          return_status: string | null
          returned_to_sender: boolean
          returned_to_sender_at: string | null
          returned_to_sender_by: string | null
          shipping_paid: number | null
          size: string | null
          status_id: string | null
          tracking_id: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          barcode?: string | null
          branch_label?: string | null
          closed_at?: string | null
          closed_by?: string | null
          color?: string | null
          company_id?: string | null
          confirmation_status?: string | null
          confirmation_token?: string | null
          courier_assigned_at?: string | null
          courier_closed_by?: string | null
          courier_commission?: number | null
          courier_id?: string | null
          courier_name_snapshot?: string | null
          created_at?: string
          created_by?: string | null
          customer_code?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_price?: number | null
          governorate?: string | null
          id?: string
          is_closed?: boolean | null
          is_courier_closed?: boolean | null
          is_pending_approval?: boolean
          is_settled?: boolean | null
          last_modified_by?: string | null
          notes?: string | null
          office_id?: string | null
          office_name_snapshot?: string | null
          partial_amount?: number | null
          payment_method?: string | null
          price?: number | null
          priority?: string | null
          product_id?: string | null
          product_name?: string | null
          quantity?: number | null
          return_status?: string | null
          returned_to_sender?: boolean
          returned_to_sender_at?: string | null
          returned_to_sender_by?: string | null
          shipping_paid?: number | null
          size?: string | null
          status_id?: string | null
          tracking_id?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          barcode?: string | null
          branch_label?: string | null
          closed_at?: string | null
          closed_by?: string | null
          color?: string | null
          company_id?: string | null
          confirmation_status?: string | null
          confirmation_token?: string | null
          courier_assigned_at?: string | null
          courier_closed_by?: string | null
          courier_commission?: number | null
          courier_id?: string | null
          courier_name_snapshot?: string | null
          created_at?: string
          created_by?: string | null
          customer_code?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_price?: number | null
          governorate?: string | null
          id?: string
          is_closed?: boolean | null
          is_courier_closed?: boolean | null
          is_pending_approval?: boolean
          is_settled?: boolean | null
          last_modified_by?: string | null
          notes?: string | null
          office_id?: string | null
          office_name_snapshot?: string | null
          partial_amount?: number | null
          payment_method?: string | null
          price?: number | null
          priority?: string | null
          product_id?: string | null
          product_name?: string | null
          quantity?: number | null
          return_status?: string | null
          returned_to_sender?: boolean
          returned_to_sender_at?: string | null
          returned_to_sender_by?: string | null
          shipping_paid?: number | null
          size?: string | null
          status_id?: string | null
          tracking_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "order_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      price_list_items: {
        Row: {
          created_at: string
          governorate: string
          id: string
          pickup_price: number
          price: number
          price_list_id: string
        }
        Insert: {
          created_at?: string
          governorate?: string
          id?: string
          pickup_price?: number
          price?: number
          price_list_id: string
        }
        Update: {
          created_at?: string
          governorate?: string
          id?: string
          pickup_price?: number
          price?: number
          price_list_id?: string
        }
        Relationships: []
      }
      price_lists: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          id: string
          name: string
          quantity: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          quantity?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          quantity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          commission_amount: number | null
          coverage_areas: string | null
          created_at: string
          full_name: string | null
          id: string
          is_active: boolean
          login_code: string | null
          notes: string | null
          office_id: string | null
          phone: string | null
          rejection_commission: number | null
          salary: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          commission_amount?: number | null
          coverage_areas?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_active?: boolean
          login_code?: string | null
          notes?: string | null
          office_id?: string | null
          phone?: string | null
          rejection_commission?: number | null
          salary?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          commission_amount?: number | null
          coverage_areas?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          login_code?: string | null
          notes?: string | null
          office_id?: string | null
          phone?: string | null
          rejection_commission?: number | null
          salary?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_office_fk"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_session_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          scanned_at: string
          scanned_code: string | null
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          scanned_at?: string
          scanned_code?: string | null
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          scanned_at?: string
          scanned_code?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_session_items_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "scan_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_sessions: {
        Row: {
          actions: Json
          ended_at: string | null
          id: string
          notes: string | null
          orders_count: number
          started_at: string
          total_count: number
          user_id: string | null
        }
        Insert: {
          actions?: Json
          ended_at?: string | null
          id?: string
          notes?: string | null
          orders_count?: number
          started_at?: string
          total_count?: number
          user_id?: string | null
        }
        Update: {
          actions?: Json
          ended_at?: string | null
          id?: string
          notes?: string | null
          orders_count?: number
          started_at?: string
          total_count?: number
          user_id?: string | null
        }
        Relationships: []
      }
      status_change_notes: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          note: string
          order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string
          order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string
          order_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          is_done: boolean
          notes: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_done?: boolean
          notes?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_done?: boolean
          notes?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          id: string
          permission: string
          section: string
          user_id: string
        }
        Insert: {
          id?: string
          permission?: string
          section: string
          user_id: string
        }
        Update: {
          id?: string
          permission?: string
          section?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string | null
          courier_id: string
          created_at: string
          id: string
          model: string | null
          next_maintenance_date: string | null
          notes: string | null
          plate_number: string | null
          vehicle_type: string
          year: number | null
        }
        Insert: {
          brand?: string | null
          courier_id: string
          created_at?: string
          id?: string
          model?: string | null
          next_maintenance_date?: string | null
          notes?: string | null
          plate_number?: string | null
          vehicle_type?: string
          year?: number | null
        }
        Update: {
          brand?: string | null
          courier_id?: string
          created_at?: string
          id?: string
          model?: string | null
          next_maintenance_date?: string | null
          notes?: string | null
          plate_number?: string | null
          vehicle_type?: string
          year?: number | null
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          created_at: string
          id: string
          message_text: string
          order_id: string
          phone: string
          sent_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_text: string
          order_id: string
          phone: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          message_text?: string
          order_id?: string
          phone?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_activity_logs: { Args: never; Returns: undefined }
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
      is_owner_or_admin: { Args: { _user_id: string }; Returns: boolean }
      log_activity: {
        Args: { _action: string; _details?: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "owner" | "admin" | "courier" | "office"
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
      app_role: ["owner", "admin", "courier", "office"],
    },
  },
} as const
