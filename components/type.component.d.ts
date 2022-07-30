interface Feature {
  ordering: string;
  status: "Yes" | "No";
  feature_name: string;
  feature_type: "input" | "select" | "checkbox" | "radio" | "url";
  sub_features: string[];
}

interface Category {
  _id: string;
  parant_category: string;
  category_name: string;
  free_post: string;
  ordering: string;
  status: "Yes" | "No";
  sub_category: string[];
  features: Feature;
  active_features: Feature;
  buttons: string[];
  icon: string;
  created_by: {
    uid: string;
    name: string;
  };
  created_at: string;
}
