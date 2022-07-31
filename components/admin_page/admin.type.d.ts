type Feature = {
  feature_name: string;
  feature_type: string;
  sub_features: string[];
  ordering: string;
  status: "Yes" | "No";
};

type LocationData = {
  _id: string;
  location_name: string;
  sub_location: string[];
  map_link?: string;
  status: "Yes" | "No";
  ordering: string;
  created_at: string;
  created_by: { uid: string; name: string };
};
