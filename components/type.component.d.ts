interface Feature {
  _id: string;
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
  active_features: Feature[];
}

interface Category {
  _id: string;
  parent_category: string;
  category_name: string;
  ordering: number;
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

interface SubLocation {
  _id: string;
  sub_location_name: string;
  map_link?: string | undefined;
  ordering: number;
  status: "Yes" | "No";
}

interface Location {
  _id: string;
  location_name: string;
  sub_location: SubLocation[];
  map_link?: string | undefined;
  ordering: number;
  created_at: string;
  created_by: {
    uid: string;
    name: string;
  };
  status: "Yes" | "No";
}
