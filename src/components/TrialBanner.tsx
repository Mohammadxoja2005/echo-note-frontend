
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface TrialBannerProps {
  daysLeft: number;
}

const TrialBanner = ({ daysLeft }: TrialBannerProps) => {
  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </span>
            <p className="ml-3 font-medium text-amber-700">
              <span>Your trial ends in <strong>{daysLeft} {daysLeft === 1 ? 'day' : 'days'}</strong>! Upgrade now to continue enjoying premium features.</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link to="/pricing">
              <Button variant="outline" className="flex items-center justify-center border border-transparent rounded-md shadow-sm text-amber-600 bg-white hover:bg-amber-50">
                View pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBanner;
