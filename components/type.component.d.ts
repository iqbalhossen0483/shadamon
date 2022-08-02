interface Feature {
  ordering: string;
  status: "Yes" | "No";
  feature_name: string;
  feature_type: "input" | "select" | "checkbox" | "radio" | "url";
  sub_features: string[];
}

interface SubCategory {
  _id: string;
  sub_category_name: string;
  free_post: Number;
  ordering: Number;
  status: "Yes" | "No";
  buttons: string[];
  active_features: Feature;
}

interface Category {
  _id: string;
  parant_category: string;
  category_name: string;
  ordering: Number;
  status: "Yes" | "No";
  sub_category: SubCategory[];
  features: Feature;
  icon: { url: string; id: string };
  created_by: {
    uid: string;
    name: string;
  };
  created_at: string;
}
