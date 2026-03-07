
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <Lock size={40} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Your account is inactive. Please subscribe to unlock all features and access the dashboard.
      </p>
      <Button 
        className="bg-echonote-purple hover:bg-echonote-purple/90"
        onClick={() => navigate("/pricing")}
      >
        Unlock Access
      </Button>
    </div>
  );
};

export default AccessDenied;
