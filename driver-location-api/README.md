2dsphere index if specifying a GeoJSON point,
2d index if specifying a point using legacy coordinates.
To specify a GeoJSON point, $near operator requires a 2dsphere index and has the following syntax:

```JSON
{
  $near: {
     $geometry: {
        type: "Point" ,
        coordinates: [ <longitude> , <latitude> ]
     },
     $maxDistance: <distance in meters>,
     $minDistance: <distance in meters>
  }
}
```

To calculate radius we divide kilometer to 6378.1, and miles to 3963.2 as described

So this will find the locations inside 1km radius.

https://www.mongodb.com/docs/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/

The equatorial radius of the Earth is approximately 3,963.2 miles or 6,378.1 kilometers.

find real location coodinates
https://www.latlong.net/
