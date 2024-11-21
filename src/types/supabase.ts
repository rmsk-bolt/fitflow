export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          exercises: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          exercises: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          exercises?: Json
        }
      }
      exercise_stats: {
        Row: {
          id: string
          created_at: string
          user_id: string
          exercise_name: string
          muscle_group: string
          sets: Json
          date: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          exercise_name: string
          muscle_group: string
          sets: Json
          date?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          exercise_name?: string
          muscle_group?: string
          sets?: Json
          date?: string
        }
      }
    }
    Functions: {
      get_user_streak: {
        Args: { user_uuid: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}