This project adapts source code from Kokonut UI, used under the MIT
License. The affected files are:

  src/components/ui/MagneticButton.jsx (from components/kokonutui/attract-button.tsx)
  src/components/ui/TiltCard.jsx       (originally from components/kokonutui/spotlight-cards.tsx;
                                         retains the glow/shimmer/dim-siblings layout pattern,
                                         but the cursor-tilt mechanic has since been removed
                                         entirely per a design change — cards no longer rotate)
  src/components/layout/Navbar.jsx     (desktop pill nav inspired by
                                         components/kokonutui/morphic-navbar.tsx)

Each file's header comment documents what was changed. Original source:
https://github.com/kokonut-labs/kokonutui

---

MIT License

Copyright (c) 2025 kokonutUI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
