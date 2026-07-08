const lucide = require('lucide-react');
const keys = Object.keys(lucide);
console.log('Face keys:', keys.filter(k => k.toLowerCase().includes('face')));
console.log('Insta keys:', keys.filter(k => k.toLowerCase().includes('insta')));
console.log('Twit keys:', keys.filter(k => k.toLowerCase().includes('twit')));
console.log('You keys:', keys.filter(k => k.toLowerCase().includes('you')));
console.log('Brand keys:', keys.filter(k => k.toLowerCase().includes('brand') || k.toLowerCase().includes('social')));

