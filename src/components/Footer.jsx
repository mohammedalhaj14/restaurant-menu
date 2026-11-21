import { RESTAURANT } from '../config';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-12 col-md-4">
            <h2 className="site-footer__title">
              <i className="fa-solid fa-location-dot" aria-hidden="true" /> Find us
            </h2>
            <address className="mb-0">
              {RESTAURANT.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="site-footer__title">
              <i className="fa-solid fa-clock" aria-hidden="true" /> Opening hours
            </h2>
            <p className="mb-0">{RESTAURANT.hours}</p>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="site-footer__title">
              <i className="fa-solid fa-phone" aria-hidden="true" /> Contact
            </h2>
            <p className="mb-0">
              <a href={`https://wa.me/${RESTAURANT.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> {RESTAURANT.whatsappDisplay}
              </a>
              <br />
              <a href={`mailto:${RESTAURANT.email}`}>
                <i className="fa-solid fa-envelope" aria-hidden="true" /> {RESTAURANT.email}
              </a>
            </p>
          </div>
        </div>
        <p className="site-footer__legal mb-0">
          &copy; {new Date().getFullYear()} {RESTAURANT.name}
        </p>
      </div>
    </footer>
  );
}
