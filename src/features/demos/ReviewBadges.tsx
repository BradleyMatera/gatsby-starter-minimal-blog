import * as React from "react";
import { StarIcon, GoogleIcon, YelpIcon } from "../../site/icons";

interface ReviewBadgesProps {
  googleRating: number;
  googleReviewCount: number;
  yelpRating: number;
  yelpReviewCount: number;
  googleUrl?: string;
  yelpUrl?: string;
}

/**
 * Mock Google Business and Yelp review badges.
 * In production, these would use:
 * - Google Places API to fetch live review data (free tier: $200 monthly credit)
 * - Yelp Fusion API to fetch live reviews (free tier: 500 calls/day)
 * The badges link to the real business profiles where customers can read and leave reviews.
 */
const ReviewBadges: React.FC<ReviewBadgesProps> = ({
  googleRating,
  googleReviewCount,
  yelpRating,
  yelpReviewCount,
  googleUrl = "#",
  yelpUrl = "#",
}) => (
  <div className="demo-review-badges">
    <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="demo-review-badge demo-review-badge--google">
      <div className="demo-review-badge__icon"><GoogleIcon size={28} /></div>
      <div className="demo-review-badge__body">
        <div className="demo-review-badge__platform">Google Reviews</div>
        <div className="demo-review-badge__rating">
          <span className="demo-review-badge__score">{googleRating}</span>
          <div className="demo-review-badge__stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} size={14} />
            ))}
          </div>
        </div>
        <div className="demo-review-badge__count">{googleReviewCount} reviews</div>
      </div>
    </a>
    <a href={yelpUrl} target="_blank" rel="noopener noreferrer" className="demo-review-badge demo-review-badge--yelp">
      <div className="demo-review-badge__icon"><YelpIcon size={28} /></div>
      <div className="demo-review-badge__body">
        <div className="demo-review-badge__platform">Yelp</div>
        <div className="demo-review-badge__rating">
          <span className="demo-review-badge__score">{yelpRating}</span>
          <div className="demo-review-badge__stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} size={14} />
            ))}
          </div>
        </div>
        <div className="demo-review-badge__count">{yelpReviewCount} reviews</div>
      </div>
    </a>
  </div>
);

export default ReviewBadges;
