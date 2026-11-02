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

const ReviewBadge = ({ href, className, children }: { href?: string; className: string; children: React.ReactNode }) =>
  href && /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <div className={className}>{children}</div>
  );

const ReviewBadges: React.FC<ReviewBadgesProps> = ({
  googleRating,
  googleReviewCount,
  yelpRating,
  yelpReviewCount,
  googleUrl,
  yelpUrl,
}) => (
  <div className="demo-review-badges">
    <ReviewBadge href={googleUrl} className="demo-review-badge demo-review-badge--google">
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
    </ReviewBadge>
    <ReviewBadge href={yelpUrl} className="demo-review-badge demo-review-badge--yelp">
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
    </ReviewBadge>
  </div>
);

export default ReviewBadges;
