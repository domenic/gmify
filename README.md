# Easy Streaming GraphicsMagick

**gmify** provides a very simple interface to the [GraphicsMagick][] image processer. It's a thin layer around the
wonderful [gm][] package, giving an API that satisfies the most common use case:

```js
gmify("source.svg", "dest.png", function (file) {
    file.flip()
        .magnify()
        .rotate("green", 45)
        .blur(7, 3)
        .crop(300, 300, 150, 130)
        .edge(3);
}, function (err) {
    if (err) {
        // `err` is compiled from the raw stderr stream if appropriate.
        // If it doesn't exist, then everything succeeded!
    }
});
```

(If you want just straight-up format conversion, you can omit the third argument.)

For more info on all the things you can do with a GraphicsMagick file, consult
[the gm package's documentation][gm-docs].

Finally, don't forget to actually install [GraphicsMagick][] on your system before using!

[GraphicsMagick]: http://www.graphicsmagick.org/
[gm]: https://github.com/aheckmann/gm/
[gm-docs]: https://github.com/aheckmann/gm/#methods
