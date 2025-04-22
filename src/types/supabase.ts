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
      pets: {
        Row: {
          id: string
          name: string
          species: string
          breed: string
          age: number
          size: string
          gender: string
          description: string
          image_url: string
          health_status: string
          vaccinated: boolean
          neutered: boolean
          microchipped: boolean
          house_trained: boolean
          good_with_kids: boolean
          good_with_dogs: boolean
          good_with_cats: boolean
          activity_level: string
          shelter_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          species: string
          breed: string
          age: number
          size: string
          gender: string
          description: string
          image_url: string
          health_status: string
          vaccinated: boolean
          neutered: boolean
          microchipped: boolean
          house_trained: boolean
          good_with_kids: boolean
          good_with_dogs: boolean
          good_with_cats: boolean
          activity_level: string
          shelter_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          species?: string
          breed?: string
          age?: number
          size?: string
          gender?: string
          description?: string
          image_url?: string
          health_status?: string
          vaccinated?: boolean
          neutered?: boolean
          microchipped?: boolean
          house_trained?: boolean
          good_with_kids?: boolean
          good_with_dogs?: boolean
          good_with_cats?: boolean
          activity_level?: string
          shelter_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      shelters: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          phone_number: string
          email: string
          website_url: string | null
          description: string
          image_url: string
          latitude: number
          longitude: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          phone_number: string
          email: string
          website_url?: string | null
          description: string
          image_url: string
          latitude: number
          longitude: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          phone_number?: string
          email?: string
          website_url?: string | null
          description?: string
          image_url?: string
          latitude?: number
          longitude?: number
          created_at?: string
          updated_at?: string
        }
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
  }
}