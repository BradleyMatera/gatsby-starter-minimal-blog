BEGIN;

UPDATE products
SET affiliate_url = 'https://www.amazon.com/dp/B0CRSNCJ6Y/?tag=bradleymatera-20'
WHERE slug = 'canakit-raspberry-pi-5-kit'
  AND affiliate_url = 'https://www.amazon.com/dp/B0CK4ZB6RN/?tag=bradleymatera-20';

UPDATE products
SET affiliate_url = 'https://www.amazon.com/dp/B01N9DA98E/?tag=bradleymatera-20'
WHERE slug = 'lego-atari-2600'
  AND affiliate_url = 'https://www.amazon.com/dp/B0B4J6RC8N/?tag=bradleymatera-20';

UPDATE products
SET affiliate_url = 'https://www.saleae.com/products/logic-8',
    affiliate_source = 'saleae',
    display_price = 'Check price at Saleae'
WHERE slug = 'saleae-logic-8'
  AND affiliate_url = 'https://www.amazon.com/dp/B01N7N3KNS/?tag=bradleymatera-20';

UPDATE products
SET affiliate_url = 'https://funko.com/pop-deluxe-r2-d2-and-princess-leia-hologram/83799.html',
    affiliate_source = 'funko',
    name = 'Funko Pop! Deluxe R2-D2 and Princess Leia Hologram',
    image_alt = 'Funko Pop! Deluxe R2-D2 and Princess Leia Hologram collectible',
    display_price = 'Check availability at Funko'
WHERE slug = 'funko-pop-r2d2-deluxe'
  AND affiliate_url = 'https://www.amazon.com/dp/B09T5B8K4S/?tag=bradleymatera-20';

COMMIT;
