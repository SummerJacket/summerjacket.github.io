---
title: "Some Content"
date: 2020-06-16T02:53:07-07:00
draft: true
---

# I am a top header (and I shouldn't be used)

Amet facilisis magna etiam tempor, orci eu lobortis elementum, nibh tellus molestie nunc, non blandit massa enim nec dui nunc mattis enim ut tellus. Lectus mauris ultrices eros, in cursus!

## I am a level 2 header

Diam donec adipiscing tristique risus nec feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae.

### I am a level 3 header

Id interdum velit laoreet id donec ultrices tincidunt arcu, non sodales neque sodales ut etiam sit amet nisl purus, in mollis nunc sed id semper? Et netus et malesuada fames.

This section has multiple paragraphs. This is here to see how consecutive paragraphs look in the browser.

Ut tristique et, egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Cras fermentum, odio eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus quam.

```javascript
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
      res.status(404).json({ message: 'Cannot find user' });
      return;
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});
```
