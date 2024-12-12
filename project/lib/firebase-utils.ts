import { db } from "../app/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

// User Profile Interface
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  skills: string[];
  learningInterests: string[];
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

// Skill Interface
export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: string;
  learningTime: string;
  prerequisites: string[];
  careerPaths: string[];
  resources: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Skill Category Interface
export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const firebaseUtils = {
  // User Profile Functions
  async createUserProfile(
    userId: string,
    userData: Partial<UserProfile>,
  ): Promise<void> {
    try {
      const userRef = doc(db, "users", userId);
      const timestamp = new Date();
      const userProfile: UserProfile = {
        id: userId,
        email: userData.email || "",
        username: userData.username || "",
        skills: userData.skills || [],
        learningInterests: userData.learningInterests || [],
        bio: userData.bio || "",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      await setDoc(userRef, userProfile);
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  },

  async updateUserProfile(
    userId: string,
    updates: Partial<UserProfile>,
  ): Promise<void> {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  async findUsersBySkills(skills: string[]): Promise<UserProfile[]> {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("skills", "array-contains-any", skills));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as UserProfile);
    } catch (error) {
      console.error("Error finding users by skills:", error);
      throw error;
    }
  },

  // Skills Functions
  async createSkill(skillData: Partial<Skill>): Promise<void> {
    try {
      const skillRef = doc(db, "skills", skillData.id!);
      const timestamp = new Date();
      const skill: Skill = {
        id: skillData.id!,
        name: skillData.name || "",
        category: skillData.category || "",
        description: skillData.description || "",
        difficulty: skillData.difficulty || "Beginner",
        learningTime: skillData.learningTime || "",
        prerequisites: skillData.prerequisites || [],
        careerPaths: skillData.careerPaths || [],
        resources: skillData.resources || [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      await setDoc(skillRef, skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      throw error;
    }
  },

  async getAllSkills(): Promise<Skill[]> {
    try {
      const skillsRef = collection(db, "skills");
      const querySnapshot = await getDocs(skillsRef);
      return querySnapshot.docs.map((doc) => doc.data() as Skill);
    } catch (error) {
      console.error("Error getting skills:", error);
      throw error;
    }
  },

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    try {
      const skillsRef = collection(db, "skills");
      const q = query(skillsRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as Skill);
    } catch (error) {
      console.error("Error getting skills by category:", error);
      throw error;
    }
  },

  // Skill Categories Functions
  async createSkillCategory(
    categoryName: string,
    categoryData: Partial<SkillCategory>,
  ): Promise<void> {
    try {
      const categoryRef = doc(db, "skillCategories", categoryName);
      const timestamp = new Date();
      const category: SkillCategory = {
        name: categoryName,
        icon: categoryData.icon || "school",
        color: categoryData.color || "#666666",
        description: categoryData.description || "",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      await setDoc(categoryRef, category);
    } catch (error) {
      console.error("Error creating skill category:", error);
      throw error;
    }
  },

  async getAllSkillCategories(): Promise<Record<string, SkillCategory>> {
    try {
      const categoriesRef = collection(db, "skillCategories");
      const querySnapshot = await getDocs(categoriesRef);
      const categories: Record<string, SkillCategory> = {};

      querySnapshot.forEach((doc) => {
        categories[doc.id] = doc.data() as SkillCategory;
      });

      return categories;
    } catch (error) {
      console.error("Error getting skill categories:", error);
      throw error;
    }
  },

  // Bulk Operations
  async seedSkills(skills: Partial<Skill>[]): Promise<void> {
    try {
      const batch = writeBatch(db);

      skills.forEach((skill) => {
        const skillRef = doc(db, "skills", skill.id!);
        const timestamp = new Date();
        batch.set(skillRef, {
          ...skill,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      });

      await batch.commit();
      console.log("Skills seeded successfully");
    } catch (error) {
      console.error("Error seeding skills:", error);
      throw error;
    }
  },

  async seedSkillCategories(
    categories: Record<
      string,
      Omit<SkillCategory, "name" | "createdAt" | "updatedAt">
    >,
  ): Promise<void> {
    try {
      const batch = writeBatch(db);
      const timestamp = new Date();

      Object.entries(categories).forEach(([categoryName, categoryData]) => {
        const categoryRef = doc(db, "skillCategories", categoryName);
        batch.set(categoryRef, {
          name: categoryName,
          ...categoryData,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      });

      await batch.commit();
      console.log("Skill categories seeded successfully");
    } catch (error) {
      console.error("Error seeding skill categories:", error);
      throw error;
    }
  },
};
